import Get from "../components/Get";
import Update from "../components/Update";
import Add from "../components/Add";
import Delete from "../components/Delete";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";

export default function Home() {
  return (
    <>
      <SeoHead title='Infobar API' />
      <Layout>
        <Add />
        <Get />
        <Update />
        <Delete />
      </Layout>
    </>
  );
}
