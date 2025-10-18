import { Button, View } from "react-native";
import { useWalletConnectModal } from "@walletconnect/modal-react-native";

import { Text } from "@/components/ui";
import { WrapperStack } from "@/components/wrapper-stack";

export default function HomeScreen() {
  const { address, isConnected, open, provider } = useWalletConnectModal();

  return (
    <WrapperStack>
      <Text>Hello</Text>

      {!isConnected ? (
        <Button title="Connect Wallet" onPress={() => open()} />
      ) : (
        <View className="items-center">
          <Text className="mb-2">Connected!</Text>
          <Text className="text-sm">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </Text>
          <Button title="Disconnect" onPress={() => provider?.disconnect()} />
        </View>
      )}
    </WrapperStack>
  );
}
