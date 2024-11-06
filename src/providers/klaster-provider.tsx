//@ts-nocheck
"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { initKlaster, loadBicoV2Account, buildMultichainReadonlyClient, buildTokenMapping, deployment, MultichainClient, MultichainTokenMapping, klasterNodeHost } from "klaster-sdk"; // Replace with actual SDK import path
import { useAccount } from "@particle-network/connectkit"; // Replace with correct import for useAccount
import { formatUnits } from "viem"; // Import ethers or other utility libraries as needed
import { arbitrum, base, optimism, polygon, scroll, baseSepolia, sepolia } from 'viem/chains'


interface KlasterContextType {
  klaster: any | null;  // Update `any` with actual type if available
  klasterBalances: string | null;
  mcClient: MultichainClient;  // Update with the actual type
  mUSDC: MultichainTokenMapping;  // Update with the actual type
  klasterAddress : any | null
  mcUSDC : any | null
}

const KlasterContext = createContext<KlasterContextType | null>(null);

export const KlasterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [klaster, setKlaster] = useState<any | null>(null);
  const [klasterBalances, setKlasterBalances] = useState<string | null>(null);
  const [klasterAddress, setklasterAddress] = useState<any | null>(null)
  const { isConnected, address } = useAccount();  // Get address from your hook

  // Set up the Multichain client and tokens
  const mcClient = buildMultichainReadonlyClient(
    [optimism, base, polygon, arbitrum, scroll, baseSepolia].map((x) => ({
      chainId: x.id,
      rpcUrl: x.rpcUrls.default.http[0],
    }))
  );

  const mcUSDC = buildTokenMapping([
    deployment(optimism.id, "0x0b2c639c533813f4aa9d7837caf62653d097ff85"),
    deployment(base.id, "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"),
    deployment(polygon.id, "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"),
    deployment(arbitrum.id, "0xaf88d065e77c8cC2239327C5EDb3A432268e5831"),
    deployment(baseSepolia.id, "0x036CbD53842c5426634e7929541eC2318f3dCF7e"),
  ]);

  // INTERSECTING TOKENS WITH CLIENTS

const intersectTokenAndClients = (
  token: MultichainTokenMapping,
  mcClient: MultichainClient
) => {
  return token.filter((deployment) =>
    mcClient.chainsRpcInfo
      .map((info) => info.chainId)
      .includes(deployment.chainId)
  );
};
  const mUSDC = intersectTokenAndClients(mcUSDC, mcClient);

  useEffect(() => {
    // Only initialize Klaster if the address is available
    if (address) {
      const initializeKlaster = async () => {
        try {
          const klasterInstance = await initKlaster({
            accountInitData: loadBicoV2Account({
              owner: address,
            }),
            nodeUrl: klasterNodeHost.default,
          });
          console.log("Klaster initialized:", klasterInstance);
          setKlaster(klasterInstance);
          const walletAddress =  klasterInstance.account.getAddress(arbitrum.id)
            setklasterAddress(walletAddress)
          // Fetch user balance
          const uBalance = await mcClient.getUnifiedErc20Balance({
            tokenMapping: mUSDC,
            account: klasterInstance.account,
          });

          const readableBalance = formatUnits(uBalance.balance, 6);
          setKlasterBalances(readableBalance);
        } catch (error) {
          console.error("Error initializing Klaster:", error);
        }
      };

      initializeKlaster();
    }
  }, [address, isConnected]); // Re-run when address, mcClient, or mUSDC changes

    console.log("wallet address from provider", address)
  return (
    <KlasterContext.Provider value={{ klaster, klasterBalances, mcClient, mUSDC, klasterAddress, mcUSDC }}>
      {children}
    </KlasterContext.Provider>
  );
};

export const useKlaster = (): KlasterContextType => {
  const context = useContext(KlasterContext);
  if (!context) {
    throw new Error("useKlaster must be used within a KlasterProvider");
  }
  return context;
};
