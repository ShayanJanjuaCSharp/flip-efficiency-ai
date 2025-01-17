'use client'

import getStripe from '@/utils/get-stripe'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { AppBar, Box, Button, Container, createTheme, Grid, Toolbar, Typography } from '@mui/material'
import Head from 'next/head'

let appTitle = "FireFlash"


export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: "POST",
      headers: {
        origin: "http://localhost:3000",
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth="100vw" sx={{ backgroundColor: "#FFDAB9", maxHeight:"100vh" }}>
      <Head>
        <title>{appTitle}</title>
        <meta name='description' content='Create flashcards from your text!' />
      </Head>

      <AppBar position='static' sx={{ backgroundColor: "#C99A83" }}>
        <Toolbar>
          <Typography variant='h6' style={{flexGrow: 1}}>{appTitle}</Typography>
          <SignedOut>
            <Button color="inherit" href='/sign-in'>Sign In</Button>
            <Button color="inherit" href='/sign-up'>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{textAlign: "center", my: 4, backgroundColor:"#FFDAB9" }}>
        <Typography variant='h2' gutterBottom>Welcome to {appTitle}!</Typography>
        <Typography variant="h5" gutterBottom>The easiest way to make flashcards from your text!</Typography>
        <Button variant='contained' sx={{mt: 2, backgroundColor: "#634526", '&:hover': { backgroundColor: "#52371E" }}}>Get Started</Button>
      </Box>

      <Box sx={{my: 6, textAlign: "center", backgroundColor:"#FFDAB9" }}>
        <Typography variant='h4' components="h2" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
          </Grid>
          <Grid item xs={12} md={4} gutterBottom>
            <Typography variant="h6">Smart Flashcards</Typography>
            <Typography>Our AI intelligently breaks down your text into consice flashcards, perfect for studying</Typography>
          </Grid>
          <Grid item xs={12} md={4} gutterBottom>
            <Typography variant="h6">Accessible Anywhere</Typography>
            <Typography>Access your flashcards from any device, at any time. Study on the go with ease.</Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{my: 6, textAlign: "center"}}>
        <Typography variant='h4' components="h2">Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{p:3, border: "1px solid", borderColor: "grey.300", borderRadius: 2}}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>£5 / month</Typography>
              <Typography>Access to basic flashcard features and limited storage.</Typography>
              <Button variant='contained'  sx={{mt: 2, backgroundColor: "#634526", '&:hover': { backgroundColor: "#52371E" }}} onClick={handleSubmit}>Choose Basic</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{p:3, border: "1px solid", borderColor: "grey.300", borderRadius: 2}}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>£10 / month</Typography>
              <Typography>Unlimited flashcards and storage, with priority support.</Typography>
              <Button variant='contained' sx={{mt: 2, backgroundColor: "#634526", '&:hover': { backgroundColor: "#52371E" }}} onClick={handleSubmit}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}