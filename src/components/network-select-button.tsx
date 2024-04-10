import { GenericSelectDialog } from "@/components/generic-select-dialog";
import { NetworkLogo } from "@/components/network-logo";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Network } from "@shushfi/sdk";

interface NetworkSelectButtonProps {
  network?: Network;
  networks?: Network[];
  onSelectNetwork?: (token: Network) => void;
}

export const NetworkSelectButton = ({
  networks,
  network,
  onSelectNetwork,
}: NetworkSelectButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="sh-w-flex sh-w-items-center sh-w-gap-x-1 sh-w-sh-w-font-medium"
        onClick={() => setOpen(true)}
      >
        {network ? (
          <>
            <NetworkLogo size={20} network={network} />
            <span className="sh-w-text-sm">{network.shortName}</span>
            {networks && networks.length > 0 && (
              <ChevronDown className="sh-w-w-4 sh-w-h-4 sh-w-ml" />
            )}
          </>
        ) : (
          <>
            <NetworkLogo size={20} />
            <Skeleton className="sh-w-rounded-md sh-w-w-16 sh-w-h-[20px]" />
          </>
        )}
      </button>
      <GenericSelectDialog
        open={open}
        onOpenChange={setOpen}
        searchPlaceholder={"Search network"}
        items={networks}
        onSelectItem={onSelectNetwork}
        matchItem={(network, query) => {
          return (
            network.name.toLowerCase().includes(query.toLowerCase()) ||
            network.shortName.toLowerCase().includes(query.toLowerCase())
          );
        }}
        renderItem={(network) => (
          <div className="sh-w-flex sh-w-items-center sh-w-gap-x-4">
            <NetworkLogo network={network} />
            <div className="sh-w-flex sh-w-flex-col sh-w-items-start">
              <span className="font-medium">{network.name}</span>
            </div>
          </div>
        )}
      />
    </>
  );
};
