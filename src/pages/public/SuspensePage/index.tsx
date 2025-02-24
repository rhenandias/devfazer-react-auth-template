import Layout from "@/components/Layout";
import Loading from "@/components/Loading";

export default function SuspensePage() {
  return (
    <Layout>
      <div className="w-full flex justify-center">
        <Loading />
      </div>
    </Layout>
  );
}
