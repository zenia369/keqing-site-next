import { SignOutButton as ClerkSignOutButton } from "@clerk/nextjs";

const SignOutButton = () => {
  return (
    <div className="w-fit p-2 border border-purple-300 text-purple-200 rounded hover:bg-purple-300 hover:text-white">
      <ClerkSignOutButton>Sign out</ClerkSignOutButton>
    </div>
  );
};

export default SignOutButton;
