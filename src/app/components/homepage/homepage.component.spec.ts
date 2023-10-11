import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import { CoffeeMenuService } from 'src/app/services/coffeeMenu/coffee-menu.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provider: CoffeeMenuService,
          useValue: ''
        }
      ]
    });
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
