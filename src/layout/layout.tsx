import React from "react";
import Head from "next/head";
import Link from "next/link";

const Layout = ({ children }: any) => {
  // const theChildren = (
  //   <div>
  //     <Head>
  //       <title>Login</title>
  //     </Head>

  //     <section className="mx-auto flex w-3/4 flex-col gap-10">
  //       <div className="title">
  //         <h1 className="py-4 text-4xl font-bold text-gray-800">Explore</h1>
  //         <p className="mx-auto w-3/4 text-gray-400">
  //           {" "}
  //           Lorem ipsum dolor sit amet consectetur adipsicing elit. Dolorers,
  //           officia?
  //         </p>
  //       </div>
  //       {/* <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
  //           <div className="input-group">
  //             <input
  //               type="email"
  //               name="email"
  //               placeholder="email"
  //               {...formik.getFieldProps("email")}
  //             />
  //             {formik.errors.email && formik.touched.email ? (
  //               <div className="text-red-500">{formik.errors.email}</div>
  //             ) : (
  //               <></>
  //             )}
  //           </div>
  //           <div className="input-group">
  //             <input
  //               type="password"
  //               name="password"
  //               placeholder="password"
  //               {...formik.getFieldProps("password")}
  //             />
  //             {formik.errors.password && formik.touched.password ? (
  //               <div className="text-red-500">{formik.errors.password}</div>
  //             ) : null}
  //           </div> */}
  //       <div className="input-button">
  //         <button type="submit">Login</button>
  //       </div>
  //       <div className="input-button">
  //         <button type="submit" onClick={handleGoogleSignIn}>
  //           Sign In with Google
  //         </button>
  //       </div>
  //       <div className="input-button">
  //         <button type="submit">Sign In with GitHub</button>
  //       </div>
  //       {/* </form> */}
  //       <p className="text-gray text-center">
  //         Do not have an account?{" "}
  //         <Link href={"/register"} className="text-blue-400">
  //           Sign Up
  //         </Link>
  //       </p>
  //     </section>
  //   </div>
  // );

  return (
    <div className="flex h-screen bg-blue-400">
      <div className="m-auto grid h-3/4 w-3/5 rounded-md bg-slate-50 lg:grid-cols-2">
        <div>hello</div>
        <div className="right flex flex-col justify-evenly">
          <div className="py-10 text-center">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
