import React from "react";
import { useForm } from "react-hook-form"; // Khởi tạo useForm từ react-hook-form
import axios from "axios"; // Sử dụng axios để gửi request

import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "../components/ui/dialog"; // Cung cấp các component giao diện

const AdminUsers = () => {
  const form = useForm(); // Khởi tạo form từ react-hook-form

  const [isFormOpen, setIsFormOpen] = React.useState(false); // State điều khiển hiển thị form
  const [editAdmin, setEditAdmin] = React.useState(null); // State chứa admin đang được chỉnh sửa (nếu có)

  // Mở form để tạo admin mới hoặc chỉnh sửa
  const openForm = () => {
    setEditAdmin(null); // Đặt lại trạng thái editAdmin khi tạo mới
    setIsFormOpen(true); // Mở form
  };

  // Hàm xử lý gửi form
  const onSubmit = async (values) => {
    try {
      if (editAdmin) {
        // PUT request để cập nhật admin đã có
        await axios.put(`/api/admin/${editAdmin.adminId}`, values);
      } else {
        // POST request để tạo admin mới
        await axios.post("/api/admin", values);
      }
      setIsFormOpen(false); // Đóng form khi thành công
    } catch (error) {
      console.error("Error saving admin:", error);
      alert(`Đã xảy ra lỗi khi lưu thông tin admin: ${error.message}`);
    }
  };

  return (
    <div>
      <button onClick={openForm}>Create New Admin</button>

      {/* Hiển thị form nếu isFormOpen là true */}
      {isFormOpen && (
        <Dialog open={true} onOpenChange={setIsFormOpen}>
          <DialogContent
            className="bg-white rounded-lg p-8 shadow-xl" // Thêm nền sáng cho DialogContent
          >
            {/* Form sử dụng react-hook-form */}
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {/* Trường Active Account */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  {...form.register("isActive")}
                  className="data-[state=checked]:bg-[#8B5A2B]"
                />
                <div className="space-y-1 leading-none">
                  <label className="text-[#704923]">Active Account</label>
                </div>
              </div>

              {/* Phần Permissions */}
              <div className="space-y-2 mt-4">
                <h3 className="text-md font-nunito font-semibold text-[#5A3A1C]">Permissions</h3>
                <div className="rounded-md border border-[#E6D5B8] p-4 space-y-4 bg-[#f7f7f7]"> {/* Nền sáng cho khu vực permissions */}
                  <div className="grid grid-cols-3 gap-2 border-b border-[#E6D5B8] pb-2">
                    <div className="font-medium text-[#5A3A1C]">Module</div>
                    <div className="font-medium text-[#5A3A1C]">Read</div>
                    <div className="font-medium text-[#5A3A1C]">Read & Write</div>
                  </div>

                  {["licenses", "enterprises", "services", "packages", "admins"].map((module) => (
                    <div key={module} className="grid grid-cols-3 gap-2 items-center">
                      <div className="text-[#704923]">
                        {module === "licenses" ? "License Management" :
                         module === "enterprises" ? "Enterprises" :
                         module === "services" ? "Services" :
                         module === "packages" ? "Service Packages" : "Admin Users"}
                      </div>

                      {/* Quyền Read */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          {...form.register(`permissions.${module}.read`)}
                          className="data-[state=checked]:bg-[#8B5A2B]"
                        />
                      </div>

                      {/* Quyền Write */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          {...form.register(`permissions.${module}.write`)}
                          className="data-[state=checked]:bg-[#8B5A2B]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <DialogFooter className="flex justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsFormOpen(false)}
                  className="border-[#D2B48C] text-[#704923] hover:bg-[#FAF6F1]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#8B5A2B] hover:bg-[#704923]"
                >
                  {editAdmin ? "Update Admin" : "Create Admin"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminUsers;
