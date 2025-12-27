export class CkeditorUploadAdapter {

  constructor(private loader: any) {}

  upload(): Promise<{ default: string }> {
    return this.loader.file.then((file: File) => {
      return new Promise((resolve, reject) => {

        const formData = new FormData();
        formData.append('file', file);

        const token = sessionStorage.getItem('auth-token');

        fetch('http://localhost:8080/api/uploads', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Erro no upload');
            }
            return response.json();
          })
          .then(result => {
            resolve({
              default: result.url
            });
          })
          .catch(error => reject(error));
      });
    });
  }

  abort() {}
}
