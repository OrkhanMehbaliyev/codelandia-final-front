import { Link } from "react-router-dom";
import AdminCategoriesContainer from "../../features/admin/categories/AdminCategoriesContainer";
import AdminPageHeader from "../../ui/AdminPageHeader";
import CustomButton from "../../ui/CustomButton";

function CategoriesPanel() {
  return (
    <>
      <div>
        <AdminPageHeader>Categories</AdminPageHeader>
        <AdminCategoriesContainer />
        <Link to="add">
          <CustomButton
            style={{
              position: "absolute",
              right: "0px",
              bottom: "0px",
              width: "60px",
              borderRadius: "40px",
              height: "60px",
              margin: "40px",
              fontSize: "30px",
              backgroundColor: "#e34c00db",
            }}
            type="secondary"
          >
            +
          </CustomButton>
        </Link>
      </div>
    </>
  );
}

export default CategoriesPanel;
