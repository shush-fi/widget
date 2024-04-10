import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface GenericSelectDialogProps<T> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items?: T[];
  onSelectItem?: (item: T) => void;
  matchItem: (item: T, query: string) => boolean;
  searchPlaceholder?: string;
  renderItem: (item: T) => React.ReactNode;
}

export function GenericSelectDialog<T>({
  open,
  onOpenChange,
  items,
  onSelectItem,
  matchItem,
  renderItem,
  searchPlaceholder = "Search",
}: GenericSelectDialogProps<T>) {
  const [query, setQuery] = useState("");

  const filteredItems = items?.filter((item) => matchItem(item, query));
  const hasItems = filteredItems && filteredItems.length > 0;

  const handleSelectItem = (item: any) => {
    onSelectItem?.(item);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <div className="sh-w-flex sh-w-flex-col sh-w-h-full sh-w-overflow-hidden">
            <div className="sh-w-flex sh-w-items-center sh-w-relative">
              <SearchIcon className="sh-w-absolute sh-w-h-5 sh-w-w-5 sh-w-top-[1.25rem] sh-w-left-[1rem] sh-w-text-secondary-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="sh-w-pl-12 sh-w-bg-transparent sh-w-text-lg sh-w-w-full sh-w-outline-none sh-w-py-4 sh-w-text-card-foreground placeholder:sh-w-text-muted-foreground"
                type="text"
              />
            </div>
            {hasItems ? (
              <ScrollArea key="test" type="always" className="sh-w-flex sh-w-flex-col sh-w-divide-y sh-w-divide-muted sh-w-overflow-y-auto shush-widget-scrollbar-hide" >
                {filteredItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectItem(item)}
                    className="sh-w-pl-3 sh-w-pr-4 sh-w-py-2 sh-w-flex sh-w-w-full sh-w-items-center sh-w-outline-none active:sh-w-bg-white/20 hover:sh-w-bg-white/10"
                  >
                    {renderItem(item)}
                  </button>
                ))}
              </ScrollArea>
            ) : (
              <div className="sh-w-flex sh-w-p-4 sh-w-text-center sh-w-text-muted-foreground">
                No items found
              </div>
            )}

          </div>
        </DialogContent>
    </Dialog>
  );
}
