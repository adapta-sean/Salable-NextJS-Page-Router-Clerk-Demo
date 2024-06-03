import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {ClerkProvider, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton} from "@clerk/nextjs";
import {Inter} from "next/font/google";

const inter = Inter({subsets: ["latin"]});

export default function App({Component, pageProps}: AppProps) {
    return (
        <ClerkProvider>
            <div className={`p-24 ${inter.className}`}>
                <SignedOut>
                    <SignInButton
                        signUpForceRedirectUrl='http://localhost:3000/api/post-sign-up'
                    />
                </SignedOut>
                <SignedIn>
                    <div className='flex gap-4'>
                        <UserButton/>
                        <SignOutButton/>
                    </div>
                </SignedIn>
            </div>
            <Component {...pageProps} />
        </ClerkProvider>
    );
}
