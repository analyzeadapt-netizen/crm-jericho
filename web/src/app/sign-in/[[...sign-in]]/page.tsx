import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-6">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm normal-case",
            card: "glass border-white/10 shadow-2xl",
            headerTitle: "text-white",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: "glass border-white/10 text-white hover:bg-white/5",
            formFieldLabel: "text-muted-foreground",
            formFieldInput: "bg-white/5 border-white/10 text-white",
            footerActionText: "text-muted-foreground",
            footerActionLink: "text-primary hover:text-primary/80"
          }
        }}
      />
    </div>
  );
}
