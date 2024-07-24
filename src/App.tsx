
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
import './hybrid.css';
import DotPattern from "./components/magicui/dot-pattern";
import Footer from "./components/footer";
import hljs from 'highlight.js';
import TurndownService from 'turndown';

function App() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const [isGenerated, setIsGenerated] = useState(false)
  const [value, setValue] = useState('')
 
  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  const code = `
                                <strong>Question: send email in java</strong><br>

// Import necessary libraries<br>import java.util.*;<br>import javax.mail.*;<br>import javax.mail.internet.*;<br><br>public class SendEmail {<br><br>    public static void main(String[] args) {<br><br>        // Recipient's email address<br>        String recipientEmail = "recipient@example.com";<br><br>        // Sender's email address and password<br>        String senderEmail = "sender@example.com";<br>        String senderPassword = "senderpassword";<br><br>        // Mail server properties<br>        Properties properties = new Properties();<br><br>        // Set SMTP server<br>        properties.put("mail.smtp.host", "smtp.example.com");<br><br>        // Set SMTP port<br>        properties.put("mail.smtp.port", "465");<br><br>        // Set authentication to true<br>        properties.put("mail.smtp.auth", "true");<br><br>        // Create a Session object with the given properties and authenticate the sender's email and password<br>        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {<br>            protected PasswordAuthentication getPasswordAuthentication() {<br>                return new PasswordAuthentication(senderEmail, senderPassword);<br>            }<br>        });<br><br>        try {<br>            // Create a MimeMessage object and set the basic information such as sender, recipient, subject, etc.<br>            MimeMessage message = new MimeMessage(session);<br>            message.setFrom(new InternetAddress(senderEmail));<br>            message.addRecipient(Message.RecipientType.TO, new InternetAddress(recipientEmail));<br>            message.setSubject("Example Email");<br><br>            // Create a Multipart object and add a BodyPart to it<br>            Multipart multipart = new MimeMultipart();<br>            BodyPart messageBodyPart = new MimeBodyPart();<br><br>            // Set the text content of the email using HTML formatting<br>            messageBodyPart.setContent("Dear recipient,<br><br>This is an example email sent through Java.<br><br><b>Have a great day ahead!</b>", "text/html");<br><br>            // Add the BodyPart to the Multipart object<br>            multipart.addBodyPart(messageBodyPart);<br><br>            // Set the Multipart object as the content of the email<br>            message.setContent(multipart);<br><br>            // Send the email<br>            Transport.send(message);<br>            System.out.println("Email sent successfully.");<br><br>        } catch (Exception e) {<br>            // Print any exceptions that may occur<br>            System.out.println("Error in sending email: " + e);<br>        }<br>    }<br>}<br><br>/* DOCUMENTATION:<br> <br>1. Import the necessary libraries for sending an email using Java.<br>2. Create a main method to start the execution of the program.<br>3. Define the recipient's email address.<br>4. Define the sender's email address and password.<br>5. Set the properties of the mail server such as the SMTP server and authentication.<br>6. Create a Session object using the given properties and authenticate the sender's email and password.<br>7. Create a try-catch block to handle any exceptions that may occur during the sending of the email.<br>8. Create a MimeMessage object to set the basic information of the email such as sender, recipient, subject, etc.<br>9. Create a Multipart object to store the different parts of the email, such as the message body.<br>10. Create a BodyPart object and set the text content of the email using HTML formatting.<br>11. Add the BodyPart to the Multipart object.<br>12. Set the Multipart object as the content of the email.<br>13. Send the email using the Transport class.<br>14. If any exceptions occur, print them.<br>*/`

  const turndownService = new TurndownService()
  const originalEscape = TurndownService.prototype.escape;
	TurndownService.prototype.escape = function( string ) {
		string = originalEscape( string );

		// Checks for escaped ordered list syntax.
    string = string.replace(/^(\W* {0,3})(\d+)\\\. /gm, '$1$2. ');

    // Removes newlines before the start of a list and between list elements.
    string = string.replace(/\n+([*+-])/g, '\n$1');

    string = string.replace(/.\\\* /g, '* ');

    string = string.replace(/\.\\\*/g, '.*');

    string = string.replace(/\\\[\\\]/g, '[]');

    string = string.replace(/\/\\\*/g, '/*');

    string = string.replace(/\\\*\//g, '*/');

		return string;
	};
  const text2 = code.replaceAll(' ', '&nbsp;')
  const markdown = turndownService.turndown(text2)
  const highlightedCode = hljs.highlightAuto(markdown).value;
  
  return (
    <><div className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border-none bg-background  ${isGenerated && 'pt-20'}`}>
      <div className="absolute top-5 right-5 z-50">
        <ModeToggle />
      </div>
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10 ">
        Generate Code
      </span>
      <AnimatedGradientText>
        <TypingAnimation
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent text-sm`
          )}
          text="Any Programming Language" />
      </AnimatedGradientText>
      <div className="flex w-full mt-16 justify-center items-center relative z-10">
        <Textarea placeholder="To generate code: Type the functionality. For example: 'send email in java'" className="w-[80%] sm:w-[35%] border-gray-900 dark:border-gray-50" value={value} onChange={(e) => setValue(e.target.value)}/>
      </div>
      <div className="z-10 flex min-h-4 mt-4 items-center justify-center">
        <ShimmerButton className="shadow-2xl" background="rgba(156, 64, 255, .5)" onClick={() => value === '' ? setIsGenerated(false) : setIsGenerated(true)}>
          <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-[#9c40ff] dark:to-[#ffaa40] lg:text-lg">
            Generate Code
          </span>
        </ShimmerButton>
      </div>

      {(isGenerated) &&
        <Card className="relative z-10 py-0 code p-2 sm:p-4 mt-8 mx-4 max-h-[70vh] max-w-[90vw] sm:max-w-[80vw] overflow-y-scroll">
          <pre>
            <code className="text-wrap html" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
          </pre>
        </Card>
        }

        <DotPattern
          className={cn(
            isGenerated ? `[mask-image:radial-gradient(70vw_circle_at_center,white,transparent)]` : `[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]`
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