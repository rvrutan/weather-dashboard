// Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
// Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private filePath = Path2D.join(__dirname, 'searchHistory.json');
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      const cities = JSON.parse(data);
      return cities.map ((city: { name: string; id: string; }) => new City(city.name, city.id));
    } catch (error) {
      console.error('Error reading file:', error);
      return[];
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {
    try {
      const data = JSON.stringify(cities, null, 2);
      await FileSystem.writeFile(this.filePath, data, 'utf8');
    } catch (error) {
      console.error('Error writing file:', error);
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  // async getCities() {}
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
