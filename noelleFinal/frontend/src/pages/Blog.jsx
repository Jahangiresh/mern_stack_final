import React from "react";
import "./blog.scss";
import { Link } from "react-router-dom";
import { MdOutlineWifi } from "react-icons/md";

const Blog = () => {
  return (
    <div className="blog">
      <div className="blog__container container">
        <div className="blog__container__title row">
          <h1 className="title__h">
            The Well-Groomed Blog{" "}
            <span className="title__span">
              <MdOutlineWifi />
            </span>
          </h1>
        </div>
        <div className="blog__container__news row">
          <div className="blog__container__news__col col-8">
            <div className="blog__container__news__col__image">
              <img
                src="https://cdn.shopify.com/s/files/1/0524/7067/7685/articles/76-Blog_1080x.jpg?v=1652794797"
                alt=""
              />
            </div>
            <div className="blog__container__news__col__content">
              <h2>'76 Was A Great Year</h2>
              <span>may 17, 2022</span>
              <p>
                From decades of trial (and error), behind-the-scenes experience,
                and a rich dialogue from my position behind the chair hearing
                what men want and need, V76 was born out of what I was doing for
                men’s style for years on every day men and American icons. V76
                celebrates the tradition of men’s grooming with an American
                sensibility, and offers a new take on grooming classics infused
                with American-sourced ingredients. V76 takes an effortless,
                uncomplicated approach, because grooming and looking good
                shouldn’t be a mystery. V76 simplifies the routine while
                elevating the experience. The collection offers a modern take on
                grooming classics...
              </p>
            </div>
          </div>
        </div>
        <div className="blog__container__news row">
          <div className="blog__container__news__col col-8">
            <div className="blog__container__news__col__image">
              <img
                src="
                https://images.unsplash.com/photo-1490003695933-fc769c821a45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80
                
                "
                alt=""
              />
            </div>
            <div className="blog__container__news__col__content">
              <h2>From Past, to the Moon</h2>
              <span>may 17, 2022</span>
              <p>
                We all remember those strange hair types from past,from movies
                or our imaginations of vintage orange books. But now time
                changed,and still going forward to teach us such new tech as
                laminating and so on...
              </p>
            </div>
          </div>
        </div>
        <div className="blog__container__news row">
          <div className="blog__container__news__col col-8">
            <div className="blog__container__news__col__image">
              <img
                src="https://images.unsplash.com/photo-1558770147-68c0607adb26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
                alt=""
              />
            </div>
            <div className="blog__container__news__col__content">
              <h2>Organic era started</h2>
              <span>december 17, 2021</span>
              <p>
                If you colour your hair frequently, you must know that
                synthetic, ammonia-laden and bleach-containing dyes can do a lot
                of damage to your hair with the chemicals in them. That’s why
                switching to herbal and natural hair colours is often a good
                idea. These are relatively gentle on hair and give damaged & dry
                tresses a break from synthetic colours, while still giving you
                that coloured-hair look.
              </p>
            </div>
          </div>
        </div>
        <div className="blog__container__news row">
          <div className="blog__container__news__col col-8">
            <div className="blog__container__news__col__image">
              <img
                src="https://images.unsplash.com/photo-1573152958734-1922c188fba3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
                alt=""
              />
            </div>
            <div className="blog__container__news__col__content">
              <h2>Chaos everywhere, how to protect our skin?</h2>
              <span>may 17, 2022</span>
              <p>
                With September now behind us, gold has posted six months of
                consecutive losses. The last time something like that happened
                was in 2018, which marked the end of a bear market for gold.
                Could we see the end of a major selloff here? <br /> There were
                critical price gains this week that could signal a significant
                turnaround for the precious metal. Key developments helping gold
                prices are the contagion risk from the volatility in the UK
                markets and escalating geopolitical tensions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
