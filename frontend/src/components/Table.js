import React from 'react'

export const Table = ({ data }) => {
    if (!data || data.length === 0) return null;
    const headers = Object.keys(data[0]);

    return (
        <table
            className="table table-hover table-bordered align-middle"
            style={{margin: "20px 20px",borderCollapse: "separate",borderSpacing: "0",borderRadius: "8px",
                overflow: "hidden", width: "95%",boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
        >
            <thead className="table-dark">
                <tr>
                    {headers.map((key) => (
                        <th
                            key={key}
                            style={{padding: "12px 15px",textAlign: "center",
                                backgroundColor: "#343a40",color: "#fff"
                            }}
                        >
                            {key}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <tr key={idx} style={{ transition: "0.3s", cursor: "pointer" }}>
                        {headers.map((key) => (
                            <td
                                key={key}
                                style={{padding: "10px 15px",textAlign: "center",borderTop: "1px solid #dee2e6"
                                }}
                            >
                                {row[key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

    )
}
