import { ReactNode } from "react";

interface LayoutProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export default function Layout({ children, className, ...props }: LayoutProps) {
  return (
    <div className="w-svw h-svh">
      {/* Aqui vocês podem colocar os elementos comuns de Layout
      Como por exemplo menus, barras laterais, footers, etc */}

      {/* <Menu  /> */}

      <div
        className={`w-full min-h-screen flex flex-col bg-gray-50 ${className}`}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}
