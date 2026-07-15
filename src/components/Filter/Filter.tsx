import styles from "./Filter.module.css";
import {useState} from "react";

type FilterCategories = Array<{category: string, options: Array<{key: string, value: string, set: boolean}>}>

type Props = {
    filterCategories: FilterCategories,
    onChange: (filterCategories: FilterCategories) => void,
}

function Filter(props: Props) {
    const [filterCategories, setFilterCategories] = useState<FilterCategories>(props.filterCategories)

    const onChange = (key: string) => {
        // const key = e.target.value;

        console.log("key", key);

        setFilterCategories(filterCategories =>
            filterCategories.map(category => ({
                ...category,
                options: category.options.map(option => (
                    {
                        ...option,
                        set: option.key === key ? !option.set : option.set
                    }
                ))
            }))
        );

        props.onChange(filterCategories);
    }

    return (
        <div className={styles.filter}>
            <h4>Filter:</h4>
            <form className={styles.categories}>
                {filterCategories.map((category) => (
                    <div className={styles.filterCategory}>
                        <h5 className={styles.categoryLabel}>{category.category}</h5>

                        <fieldset className={styles.options}>
                            {category.options.map((option) => (
                                <div className={styles.option}>
                                    <input className={option.set ? styles.checked : undefined} type="checkbox" name={option.key} id={option.key} value={option.key} onChange={() => onChange(option.key)} />
                                    <label htmlFor={option.key}>{option.value}</label>
                                </div>
                            ))}
                        </fieldset>

                    </div>
                ))}
            </form>
        </div>
    )
}

export default Filter;