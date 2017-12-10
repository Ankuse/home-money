import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';

@Component({
  selector: 'usr-delete-category',
  templateUrl: './delete-category.component.html',
  styleUrls: ['./delete-category.component.styl']
})
export class DeleteCategoryComponent implements OnInit {

  @Input() categories: Category[];
  @Output() onCategoryDelete = new EventEmitter<Category>(); // Экспортиру событие по подписке на удаление категории deleteCategory
  currentCategory: Category;

  currentCategoryId = 0;

  types = [
    {type: 'yes', label: 'Да, я уверен'},
    {type: 'no', label: 'Нет, я не уверен'}
  ];

  constructor(
      private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.onCategoryChange();
  }

  onSubmit(form: NgForm) {

    let { name, capacity} = form.value;

    const category  = new Category(
        name,
        capacity,
        this.currentCategoryId
    );

    this.categoriesService.deleteCategory(category)
      .subscribe( (category: Category) => {
        this.onCategoryDelete.emit(category);
      });
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find(c => c.id === +this.currentCategoryId);
    // принмает обьект (с) и сравнивает c.id c выбранным в селекте id и находит этот объект
    console.log();
  }
}
