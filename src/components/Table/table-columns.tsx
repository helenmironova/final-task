import { Link } from "react-router-dom"

const columns = [
  {
    accessorKey: "number",
    header: "#",
    size: 60,
    cell: (info: any) => info.row.index + 1,
  },
  {
    accessorKey: "accession",
    header: "Entry",
    cell: (info: any) => {
      const value = info.getValue() as string

      return (
        <Link to={`/protein/${value}`} className="entry-link" target="_blank">
          {value}
        </Link>
      )
    },
  },
  {
    accessorKey: "id",
    header: "Entry Name",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "gene",
    header: "Genes",
    cell: (info: any) => info.getValue(),
  },
  {
    accessorKey: "organism_name",
    header: "Organism",
    cell: (info: any) => {
      return (
        <span className="organism-name">
          {info.getValue() as React.ReactNode}
        </span>
      )
    },
  },
  {
    accessorKey: "subcellularLocation",
    header: "Subcellular Location",
    cell: (info: any) => {
      const value = info.getValue() as string

      if (value.length > 30) {
        const words = value.split(" ")
        const truncatedValue = words.slice(0, 2).join(" ")

        return (
          <span className="subcellular-location">
            {truncatedValue}
            {"..."}
          </span>
        )
      }

      return value
    },
  },
  {
    accessorKey: "length",
    header: "Length",
    cell: (info: any) => {
      return info.getValue()
    },
  },
]

export default columns
