import * as React from 'react';
import {useEffect, useState} from 'react';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import {httpVideo} from "../../util/http";

const columsDefinition : MUIDataTableColumn[] = [
    {
        name: 'name',
        label: 'Nome',
    },
    {
        name: 'categories',
        label: 'Categorias',
        options: {
            customBodyRender : (value, tableMeta, updateValue) => {
                return value.map(value => value.name).join(', ');
            }
        }
    },
    {
        name: 'created_at',
        label: 'Criado em',
        options: {
            customBodyRender(value, tableMeta, update) {
                return <span>{format(parseISO(value), 'dd/MM/yyyy')}</span>;
            }
        }
    },  
];

type Props = {
    
};
export const Table = (props: Props) => {
    
    const [data, setData] = useState([]);
    
    useEffect(() => {
       httpVideo.get('genres').then(
           response => setData(response.data.data)
       );

    }, []);
    
    return (
        <MUIDataTable
            title="Listagem de gêneros"
            columns={columsDefinition}
            data={data}
        />
    );
};
        
export default Table;
