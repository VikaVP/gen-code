import { useEffect, useState } from "react";
import Particles from "./components/magicui/particles";
import { useTheme } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import TypingAnimation from "./components/magicui/typing-animation";
import AnimatedGradientText from "./components/magicui/animated-gradient-text";
import { cn } from "./lib/utils";
import { Textarea } from "./components/ui/textarea";
import ShimmerButton from "./components/magicui/shimmer-button";
import { Card } from "./components/ui/card";
import Highlight from 'react-highlight'
import './hybrid.css';
import DotPattern from "./components/magicui/dot-pattern";
import Footer from "./components/footer";

function App() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const [isGenerated, setIsGenerated] = useState(false)
  const [value, setValue] = useState('')
 
  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  const highlightedCode = `<pre>
          <code class="html hljs xml">
          <strong>Question: send email in react</strong><br/><br/>// Import the necessary components and libraries<br/>// Here we will use the "nodemailer" library to send emails<br/>import React from 'react';<br/>import nodemailer from 'nodemailer';<br/><br/>// Create a class component for the "SendEmail" functionality<br/>class SendEmail extends React.Component {<br/><br/>// Define the initial state of the component with an empty message<br/>  constructor(props) {<br/>    super(props);<br/>    this.state = {<br/>      message: ''<br/>    };<br/>  }<br/><br/>  // Create a function to set the email message based on user input<br/>  setMessage = (event) =&gt; {<br/>    this.setState({ message: event.target.value });<br/>  }<br/><br/>  // Create a function to send the actual email<br/>  sendEmail = () =&gt; {<br/><br/>    // Create a nodemailer transport object with the necessary SMTP information<br/>    let transport = nodemailer.createTransport({<br/>      host: 'smtp.gmail.com',<br/>      port: 465,<br/>      auth: {<br/>        user: 'your-email@gmail.com',<br/>        pass: 'your-password'<br/>      }<br/>    });<br/><br/>    // Define the mailOptions - this is where you set the sender, recipient, subject, and body of the email<br/>    let mailOptions = {<br/>      from: 'Sender Name <your-email@gmail.com>',<br/>      to: 'recipient@gmail.com',<br/>      subject: 'Test Email',<br/>      text: this.state.message<br/>    };<br/><br/>    // Use the nodemailer "sendMail" function to actually send the email<br/>    transport.sendMail(mailOptions, (error, info) =&gt; {<br/><br/>      // Handle any errors that may occur<br/>      if (error) {<br/>        console.log(error);<br/>      } else {<br/>        console.log('Email sent: ' + info.response);<br/>      }<br/>    });<br/>  }<br/><br/>  // Render the component with a form for the user to input the message and a button to send the email<br/>  render() {<br/>    return (<br/>      <div><br/>  <h1>Send an Email</h1><br/>        <br/>          <label>Message:</label><br/>          <input type="text" value="{this.state.message}" onchange="{this.setMessage}"><br/>          <button onclick="{this.sendEmail}">Send</button><br/>        <br/>      </div><br/>    );<br/>  }<br/>}<br/><br/>// Export the component so it can be used in other parts of the application<br/>export default SendEmail;
              </your-email@gmail.com></code>
          </pre>`
 
  return (
    <><div className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border-none bg-background  ${isGenerated && 'pt-20'}`}>
      <div className="absolute top-5 right-5 z-50">
        <ModeToggle />
      </div>
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 ">
        Generate Code
      </span>
      <AnimatedGradientText>
        <TypingAnimation
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-sm`
          )}
          text="Any Programming Language" />
      </AnimatedGradientText>
      <div className="flex w-full mt-4 justify-center items-center relative z-10">
        <Textarea placeholder="To generate code: Type the functionality. For example: 'send email in java'" className="w-[80%] sm:w-[50%] " value={value} onChange={(e) => setValue(e.target.value)}/>
      </div>
      <div className="z-10 flex min-h-4 mt-4 items-center justify-center">
        <ShimmerButton className="shadow-2xl" background="rgba(156, 64, 255, .5)" onClick={() => value === '' ? setIsGenerated(false) : setIsGenerated(true)}>
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-[#9c40ff] dark:to-[#ffaa40] lg:text-lg">
            Generate Code
          </span>
        </ShimmerButton>
      </div>

      {isGenerated &&
        <Card className="relative z-10 py-0 bg-[#282a36] px-2 sm:px-4 mt-4 mx-4">
          <Highlight innerHTML={true}>
            {highlightedCode}
          </Highlight>
        </Card>}

      <DotPattern
        className={cn(
          isGenerated ? `[mask-image:radial-gradient(90vw_circle_at_center,white,transparent)]` : `[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]`
        )} />

      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={color}
        refresh />
    </div>
      <Footer />
    </>
  );
}

export default App;