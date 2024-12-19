import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../features/dataSlice";

const SettingsForm = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.data.settings);

  const handleThemeChange = (e) => {
    dispatch(updateSettings({ theme: e.target.value }));
  };

  const handleItemsPerPageChange = (e) => {
    dispatch(updateSettings({ itemsPerPage: Number(e.target.value) }));
  };

  return (
    <form className="settings-form">
      <label>
        Tema:
        <select value={settings.theme} onChange={handleThemeChange}>
          <option value="light">Ljust</option>
          <option value="dark">Mörkt</option>
        </select>
      </label>
      <label>
        Poster per sida:
        <input
          type="number"
          value={settings.itemsPerPage}
          onChange={handleItemsPerPageChange}
        />
      </label>
    </form>
  );
};

export default SettingsForm;
