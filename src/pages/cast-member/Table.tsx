import * as React from 'react';
import {useEffect, useState} from 'react';
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import {httpVideo} from "../../util/http";

const CastMemberTypeMap = {
    1: 'Diretor',
    2: 'Ator'
};

const columsDefinition : MUIDataTableColumn[] = [
    {
        name: 'name',
        label: 'Nome',
    },
    {
        name: 'type',
        label: 'Tipo',
        options: {
            customBodyRender: (value, tableMeta, update) => {
                 return CastMemberTypeMap[value];
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
       httpVideo.get('cast_members').then(
           response => setData(response.data.data)
       );
    }, []);
    
    return (
        <MUIDataTable
            title="Listagem de membros"
            columns={columsDefinition}
            data={data}
        />
    );
};
        
export default Table;
