import { South } from './south.js';
import { Middle } from './middle.js';
import { North } from './north.js';
import { isValidDate, isFuture } from '../tools/date.js';

// Create Lottery model which can represent South, Middle or North
class Lottery {
  constructor(region, date) {
    if (!isValidDate(date)) {
      throw { status: 400, message: 'Date is not valid' };
    }

    if (region === 'south') {
      this.model = new South(date);
    } else if (region === 'middle') {
      this.model = new Middle(date);
    } else if (region === 'north') {
      this.model = new North(date);
    } else {
      throw { status: 400, message: 'Region is not valid' };
    }
  }
  async getOrUpdate() {
    if (isFuture(this.model.date, this.model.timeRes)) {
      throw { status: 404, message: 'Does not have result yet' };
    }
    return await this.model.getOrUpdate();
  }
}

export { Lottery };