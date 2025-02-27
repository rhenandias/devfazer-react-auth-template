import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().trim().email({
    message: "Informe um endereço de e-mail válido",
  }),
  password: z.string().trim().min(8, {
    message: "A senha deve ter no mínimo 8 caracteres",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Login() {
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = useCallback(
    async (values: FormSchema) => {
      setLoading(true);

      try {
        await signIn({
          email: values.email,
          password: values.password,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [signIn]
  );

  return (
    <Layout>
      <div className="w-svw h-svh flex justify-center items-center ">
        {loading && <Loading />}

        {!loading && (
          <div className="flex flex-col space-y-3 items-center">
            <span className="textt-gray-600 font-semibold">Login</span>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-3"
              >
                <Controller
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <Input {...field} placeholder="E-mail de usuário" />
                  )}
                />

                <Controller
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <Input {...field} type="password" placeholder="Sua senha" />
                  )}
                />

                <Button className="w-full">Login</Button>
              </form>
            </FormProvider>
          </div>
        )}
      </div>
    </Layout>
  );
}
