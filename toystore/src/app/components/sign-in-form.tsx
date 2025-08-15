"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  email: z.email({
    error: "Formato de e-mail inválido",
  }),
  password: z
    .string({
      error: "Senha é obrigatória",
    })
    .min(1, "Senha é obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

export function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: FormData) {
    try {
      await signIn(data);
      router.push("/dashboard");
    } catch (error) {
      const isAxiosError = error instanceof Error;

      const message = isAxiosError
        ? error.response.data.error
        : "Erro desconhecido";

      toast.error(message);
    }
  }

  return (
    <Card className="card-gradient border-0 shadow-glow animate-slide-up">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Bem-vindo de volta</CardTitle>
        <CardDescription>Faça login para acessar o dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite seu email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Form>
        <Link
          href="/register"
          className="w-full text-sm underline text-primary"
        >
          Não tenho uma conta
        </Link>
      </CardContent>
    </Card>
  );
}
