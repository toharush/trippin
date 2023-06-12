import axios from 'axios';

const accessKey = 'FrpWZ6QrBbJZ9kZ7zfE0T90VdhDfI8b8OLnXNaFTb-I';
const baseURL = 'https://api.unsplash.com';

class CityImagesResourceService {
  private httpClient = axios.create({
    baseURL: baseURL,
    headers: {
      'Accept-Version': 'v1',
      'Authorization': `Client-ID ${accessKey}`,
    },
  });

  async getCityImages(city: string): Promise<any> {
    try {
      const response = await this.httpClient.get('/search/photos', {
        params: {
          query: city,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}

export default new CityImagesResourceService();
