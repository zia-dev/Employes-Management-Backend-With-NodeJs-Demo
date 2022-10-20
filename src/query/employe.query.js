const EMPLOYES_QUERY = {
  SELECT_EMPLOYES: 'SELECT * FROM employes ORDER BY created_at DESC LIMIT 100',
  SELECT_EMPLOYE: 'SELECT * FROM employes WHERE id = ?',
  CREATE_EMPLOYE: 'INSERT INTO employes(first_name, last_name, email, phone, address, designation, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
  UPDATE_EMPLOYE: 'UPDATE employes SET first_name = ?, last_name = ?, email = ?, phone = ?, address = ?, desingation = ?, image_url = ? WHERE id = ?',
  DELETE_EMPLOYE: 'DELETE FROM employes WHERE id = ?',
  CREATE_EMPLOYE_PROCEDURE: 'CALL create_and_return(?, ?, ?, ?, ?, ?, ?)'
};

export default EMPLOYES_QUERY;
