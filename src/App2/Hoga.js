function SingleHoga(prop) {
  const data = Array.from(prop.data);

  const hoga = data.map((value) => <li>{value}</li>);

  return (
    <>
      <ul> {hoga} </ul>
    </>
  );
}

function Hoga({ data }) {
  // useEffect(() => {
  //   SingleHoga({ data });
  // }, []);

  return (
    <>
      {/* {data.map((hoga) => (
        <SingleHoga hoga={hoga} />
      ))} */}
      <SingleHoga data={data} />
    </>
  );
}

export default Hoga;
