import { Flex, message, Row } from "antd";
import PageHeader from "../../ui/PageHeader";
import CustomButton from "../../ui/CustomButton";
import WishlistContainer from "../../features/app/wishlist/WishlistContainer";
import { useClearWishlistMutation } from "../../features/api/apiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function WishlistPage() {
  const [clearWishlist] = useClearWishlistMutation();
  const user = useSelector((state: RootState) => state.user);
  if (!user.user_id) {
    return <div>You should login first</div>;
  }
  const handleClear = async () => {
    try {
      await clearWishlist(user.user_id).unwrap();
      message.success("Wishlist cleared successfully.");
    } catch (err: any) {
      message.error(err.data.message);
    }
  };
  return (
    <Flex vertical gap={10}>
      <PageHeader>My wishlist</PageHeader>
      {user.user_id ? (
        <Row justify={"end"}>
          <CustomButton onClick={handleClear} type="secondary">
            Clear wishlist
          </CustomButton>
        </Row>
      ) : (
        <Row>You should login to view wishlist.</Row>
      )}
      <WishlistContainer />
    </Flex>
  );
}

export default WishlistPage;
