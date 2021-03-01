
export default function(iso_date){
    const date = new Date(iso_date);
    return (`${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()} `);
}