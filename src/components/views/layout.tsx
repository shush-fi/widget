export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sh-w-flex sh-w-flex-col sh-w-h-full sh-w-min-h-[684px]">
      {children}
    </div>
  );
}
