import React, { useEffect, useState } from 'react';
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ onPaymentSuccess }: { onPaymentSuccess: (paymentIntentId: string) => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/ebook-success',
      },
      redirect: 'if_required'
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase! You can now download the ebook.",
      });
      onPaymentSuccess(paymentIntent.id);
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full"
        size="lg"
      >
        {isProcessing ? 'Processing...' : 'Complete Purchase - $14.00'}
      </Button>
    </form>
  );
};

const EbookCheckout: React.FC = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-ebook-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          toast({
            title: "Error",
            description: "Failed to initialize payment. Please try again.",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error('Payment initialization error:', error);
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
      });
  }, []);

  const handlePaymentSuccess = (paymentId: string) => {
    setPaymentIntentId(paymentId);
    setPaymentSucceeded(true);
  };

  const handleDownload = () => {
    // Verify payment first, then trigger download
    fetch("/api/verify-ebook-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.canDownload) {
          // Trigger the ebook download (same logic as before)
          const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Stoic Seller</title>
  <style>
    body { font-family: 'Inter', sans-serif; margin: 40px; }
    .header { text-align: center; margin-bottom: 40px; }
    .title { font-size: 36px; font-weight: bold; color: #40514e; }
    .subtitle { font-style: italic; color: #666; }
    .content { max-width: 800px; margin: 0 auto; line-height: 1.6; }
    h1 { color: #40514e; border-bottom: 2px solid #96b4b1; padding-bottom: 10px; }
    h2 { color: #40514e; margin-top: 30px; }
    .reflection { background: #f0fdf4; padding: 20px; border-left: 4px solid #96b4b1; margin: 20px 0; }
    .assignment { background: #fef3c7; padding: 20px; border-left: 4px solid #c07a5d; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="title">THE STOIC SELLER</h1>
    <p class="subtitle">A Philosophical Guide to Sales Mastery through Presence, Practice, and Perspective</p>
  </div>
  <div class="content">
    <h1>Introduction to The Stoic Seller</h1>
    <p>Thank you for purchasing The Stoic Seller ebook! This comprehensive guide will transform your approach to sales through ancient wisdom and modern techniques.</p>
    <!-- Add full ebook content here -->
  </div>
</body>
</html>`;

          const blob = new Blob([htmlContent], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'the-stoic-seller-ebook.html';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      });
  };

  if (!clientSecret) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  if (paymentSucceeded) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Thank you for purchasing The Stoic Seller ebook!</p>
            <Button onClick={handleDownload} size="lg">
              Download Your Ebook
            </Button>
            <div className="pt-4">
              <Link href="/resources">
                <Button variant="outline">Back to Resources</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/resources" className="text-accent hover:text-accent-dark transition-colors">
          ← Back to Resources
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Purchase The Stoic Seller Ebook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">What you're purchasing:</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
              <li>Complete 6-module guide on applying Stoic principles to sales</li>
              <li>Practical techniques and real-world scripts</li>
              <li>Reflection exercises and assignments</li>
              <li>Professional typography and elegant styling</li>
              <li>Download as HTML file for any browser</li>
            </ul>
          </div>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">The Stoic Seller Ebook</span>
              <span className="font-bold text-xl">$14.00</span>
            </div>
          </div>

          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm onPaymentSuccess={handlePaymentSuccess} />
          </Elements>
        </CardContent>
      </Card>
    </div>
  );
};

export default EbookCheckout;