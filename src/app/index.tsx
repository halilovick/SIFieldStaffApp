import Footer from "@/components/footer";
import Header from "@/components/header";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";

import TwoFactorAuthenticationPopup from "@/components/2FAPopup"; // Import the 2FA popup component
const { authenticateTwoFactorCode } = require("@/lib/2FAService"); // Import the 2FA service


export default function Page() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleAuthenticate = async (code) => {
    // Call the authentication function from the service
    const isAuthenticated = await authenticateTwoFactorCode(code);
    if (isAuthenticated) {
      console.log("Authentication successful");
      setIsPopupVisible(false);
      // Continue with logic after successful authentication
    } else {
      console.log("Authentication failed");
      // Handle authentication failure
    }
  };

  return (
    <View className="flex flex-1">
      <Header />
      <Content handleOpenPopup={handleOpenPopup} />
      <Footer />
      {/* Render the TwoFactorAuthenticationPopup component */}
      <TwoFactorAuthenticationPopup isVisible={isPopupVisible} onClose={handleClosePopup} onAuthenticate={handleAuthenticate} />
    </View>
  );
}


function Content({ handleOpenPopup }) {
  return (
    <View className="flex-1">
      <View className="py-12 md:py-24 lg:py-32 xl:py-48">
        <View className="px-4 md:px-6">
          <View className="flex flex-col items-center gap-4 text-center">
            <Text
              role="heading"
              className="text-3xl text-center native:text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Field Staff App
            </Text>
            <Text className="mx-auto max-w-[700px] text-lg text-center text-gray-500 md:text-xl dark:text-gray-400">
              Facilitating field staff in recording information about designated locations.
            </Text>

            <View className="gap-4">
              {/* Button to open the 2FA popup */}
              <Button title="Open 2FA Popup" onPress={handleOpenPopup} />
              <Link
                suppressHighlighting
                className="flex h-9 items-center justify-center overflow-hidden rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 web:shadow ios:shadow transition-colors hover:bg-gray-900/90 active:bg-gray-400/90 web:focus-visible:outline-none web:focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/"
              >
                Explore
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}