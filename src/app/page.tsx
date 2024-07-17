import Head from "next/head"

// トップページ
const Home = async () => {
  return (
    <div className="container mx-auto py-10 w-full">
      <Head>
        <title>勤務管理システム</title>
        <meta name="description" content="勤務管理システム" />
      </Head>
    </div>
  )
}

export default Home