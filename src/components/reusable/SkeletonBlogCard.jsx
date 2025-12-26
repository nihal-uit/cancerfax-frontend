import styled from "styled-components";

const SkeletonWrapper = styled.div`
  background: #f3f3f3;
  border-radius: 12px;
  overflow: hidden;
  height: 420px;
  animation: pulse 1.6s infinite ease-in-out;

  @keyframes pulse {
    0% { background-color: #f3f3f3; }
    50% { background-color: #e9e9e9; }
    100% { background-color: #f3f3f3; }
  }
`;

export default function SkeletonBlogCard() {
  return <SkeletonWrapper />;
}
