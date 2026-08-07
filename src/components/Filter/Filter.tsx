import styles from "./Filter.module.css";

// type FilterCategories = Array<{category: string, options: Array<{key: string, value: string, set: boolean}>}>

export type FilterItem = {
    name: string,
    slug: string,
    type: "category" | "tag",
    selected: boolean,
}

export type FilterCollection = {
    label: string,
    filters: Array<FilterItem>
}

export type Filters = Array<FilterCollection>

type Props = {
    filters: Filters,
    onChange: (filters: Filters) => void,
}


function Filter(props: Props) {
    const onChange = (label: string, key: string) => {
        console.log(key)
        console.log(props.filters)

        const updatedFilters = props.filters.map(filterCollection => {
            return {
                ...filterCollection,
                filters: filterCollection.label === label ? filterCollection.filters.map(filter => {
                    return {
                        ...filter,
                        selected: filter.slug === key ? !filter.selected : filter.selected,
                    }
                }): filterCollection.filters
            }
        });

        props.onChange(updatedFilters);
    }

    return (
        <div className={styles.filter}>
            <h4>Filter:</h4>
            <form className={styles.categories}>
                {props.filters.map((filterCollection) => (
                    <div className={styles.filterCategory}>
                        <h5 className={styles.categoryLabel}>{filterCollection.label}</h5>

                        <fieldset className={styles.options}>
                            {filterCollection.filters.map((filter) => (
                                <div className={styles.option}>
                                    {/* Use filterCollection.label + filter.slug to ensure id does not conflict when two collections have items with identical slugs */}
                                    <input className={filter.selected ? styles.checked : undefined} type="checkbox" name={filter.name} id={filterCollection.label + filter.slug} value={filter.slug} onChange={() => onChange(filterCollection.label, filter.slug)} />
                                    <label htmlFor={filterCollection.label + filter.slug}>{filter.name}</label>
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