import { SignInForm } from "@/app/components/sign-in-form";
import { Logo } from "@/components/logo";

export default function Home() {
  return (
    <div className="gradient-hero min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo />
          <h1 className="text-3xl font-bold text-white mb-2">ToyStore</h1>
          <p className="text-white/80">Sistema de Gestão de Vendas</p>
        </div>

        <SignInForm />
      </div>
    </div>
  );
}
