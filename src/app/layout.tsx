"use client";

import { $authenStore } from "@lib/authenStore";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import axios from "axios";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { MantineProvider,
  Container, 
  Title, 
  Group, 
  Loader 
} from "@mantine/core";
import "@mantine/core/styles.css";

// export const metadata: Metadata = {
//   title: "Lecture 20",
//   description: "Generated by create next app",
// };

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isCheckingAuthen, setIsCheckingAuthen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const checkAuthen = async () => {
    const token = localStorage.getItem("token");
    const authenUsername = localStorage.getItem("authenUsername");

    //check within localStorage
    let isTokenValid = true;
    if (!token || !authenUsername) {
      isTokenValid = false;
    } else {
      //check if token still valid
      try {
        const resp = await axios.get("/api/user/checkAuthen", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // save token and authen username?

      } catch (err) {
        console.log(err.message);

        //mark as unauthorized
      }
    }

    //go to login if not logged in yet and trying to access protected route

    //go to /student if already logged in
  };

  useEffect(() => {
    checkAuthen();
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>
          {/* hide page content with loader */}
          <Group align="center">
              <Loader />
            </Group>
          <Container size="sm">
            <Title fs="italic" ta="center" c="violet" my="xs">
              Course Enrollment
            </Title>
            {children}
          </Container>

        </MantineProvider>
      </body>
    </html>
  );
}
