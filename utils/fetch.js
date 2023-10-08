
export async function FETCH(method,body,link){
    if(method=="POST"){
        return await fetch(link, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });
    }
    return await fetch(link);

}