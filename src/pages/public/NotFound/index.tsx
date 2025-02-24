import Layout from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="w-screen h-screen flex justify-center items-center">
        <span className="text-gray-600 font-semibold">
          A rota especificada não foi encontrada
        </span>
      </div>
    </Layout>
  );
}
