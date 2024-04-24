import { LogoutButton } from "@/components/LogoutButton";

export const SettingsPage = () => {
  return (
    <section className="flex justify-between items-center flex-col h-full flex-1 px-4 pt-1 pb-4">
      <div className="relative w-full">
        {/* <Link to="/" className="absolute inset-0">
          <Button
            size="xs"
            color="#24292F"
            className="[$>span]:p-0bg-opacity-0 text-gray-700 dark:text-gray-100 dark:hover:text-white hover:text-black hover:bg-opacity-100 dark:hover:bg-opacity-0 p-0"
          >
            <IconArrowBack className="mr-1 h-4 w-4" />
            Back
          </Button>
        </Link> */}
        <h1 className="text-xl text-slate-900 dark:text-slate-300 text-center">
          ⚙️ Settings
        </h1>
      </div>
      <LogoutButton />
    </section>
  );
};
