import { Inter } from "next/font/google";
import {useEffect, useState} from "react";
import {useUser} from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [capabilities, setCapabilities] = useState<string[] | null>(null);
  const {isSignedIn} = useUser();

  useEffect(() => {
    if (!isSignedIn) {
        setCapabilities(null);
        return;
    }
    fetch("/check-license")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if(data.capabilities) {
            setCapabilities(data.capabilities)
          } else {
            setCapabilities(null)
          }
        })
        .catch(e => console.error(e));
  }, [isSignedIn]);

  return (
    <main
      className={`flex min-h-screen flex-col py-6 px-24 ${inter.className}`}
    >
      <h1>Salable NextJS Page Router + Iron Session Demo</h1>
      {capabilities ? (
          <>
            <h2>Capabilities</h2>
            <ul>
              {capabilities.map(capability => <li key={capability}>{capability}</li>)}
            </ul>
          </>
      ) : null}
    </main>
  );
}
