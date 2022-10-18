import { useSelector } from "react-redux";

const Dashboard = () => {
  const {user} = useSelector((state) => state.auth);

  console.log(user)
  return (
    <>
    <div>{user? <>{user?.email}</>:<><p>No se pudieron Obtener los datos</p></>}</div>
    </>
  )
}

export default Dashboard
