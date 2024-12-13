import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {winCategory} from "../../../utils/server";

const useCategory = () => {
    const {id} = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const foundCategory = winCategory.find((item) => item.id === parseInt(id));
        setCategory(foundCategory);
    }, [id]);

    return category;
};

export default useCategory;
