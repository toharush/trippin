import { useState } from "react";
import { isEmpty } from "lodash";
import useActivities from "./useActivities";

const useDestinations = () => {

    const [searchString, setSearchString] = useState("");
    const [searchResultsDests, setSearchResults] = useState<any[]>([]);
    const { activities } = useActivities();

    const destinations= [

    {   name: "Miami",
        location: [25.77094535177296, -80.19650278592586] as [number,number]
    },
    {   name: "Orlando",
        location: [28.428319906031717, -81.3133388296368] as [number,number]
    }];
   
    const searchDestination = async (name: string | undefined) => {
        const newName = name ?? "";
        await setSearchString(newName);
        await find();
      };

      const find = async () => {
        let values:[] = [];
        if (searchString !== "" && !isEmpty(searchString)) {
          // @ts-ignore
          values = destinations?.filter(
            (dest) =>  dest.name.toLowerCase().includes(searchString.toLowerCase()) 
          );
        }
        // @ts-ignore
        console.log(values);
        await setSearchResults(values);
      };

      return {
        destinations,
        searchDestination,
        searchResultsDests
    };
};



export default useDestinations;