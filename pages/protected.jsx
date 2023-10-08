import { NextPage } from "next";
import { useSession } from "next-auth/react";


const Protected = () =>{
    const session = useSession();
    // console.log("session",session);
    return <div>
        this page is protected for special people
    </div>
};

export default Protected;