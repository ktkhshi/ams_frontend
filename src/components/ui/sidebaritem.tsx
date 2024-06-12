"use client"

export default function SidebarUserItem() {
  return (
    <div className="flex items-center justify-between gap-2 border rounded-[8px] p-2">
      <div className="avatar rounded-full min-h-8 min-w-8 bg-emerald-500 text-white font-[700] 
                      flex itmes-center justify-center">
        <p>KT</p>
      </div>
      <div className="grow">
        <p className="text-[16px] font-bold">ログインしている人の名前</p>
        <p className="text-[12px] text-neutral-500">test@test.com</p>
      </div>
    </div>
  );
}