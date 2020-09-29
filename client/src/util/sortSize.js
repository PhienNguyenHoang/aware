const sizeSchema = {
    S: 1,
    M: 2,
    L: 3
}

export const sortSize = (array) => {
    let swapp;
    let n = array.length-1;
    let x=array;
    do {
        swapp = false;
        for (let i=0; i < n; i++)
        {
            if (sizeSchema[x[i]] > sizeSchema[x[i+1]])
            {
               let temp = x[i];
               x[i] = x[i+1];
               x[i+1] = temp;
               swapp = true;
            }
        }
        n--;
    } while (swapp);
 return x; 
}